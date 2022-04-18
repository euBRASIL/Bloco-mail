export const idlFactory = ({ IDL }) => {
  const InitArgs = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'custodians' : IDL.Opt(IDL.Vec(IDL.Principal)),
  });
  const QueryBatchBo = IDL.Record({
    'is_sender' : IDL.Bool,
    'recipient_alias' : IDL.Text,
    'subject' : IDL.Text,
    'sender_alias' : IDL.Text,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : IDL.Text });
  const BucketFile = IDL.Record({
    'canister_id' : IDL.Principal,
    'file_id' : IDL.Nat64,
  });
  const EmailBody = IDL.Record({
    'text_content' : IDL.Text,
    'attach' : IDL.Opt(IDL.Vec(BucketFile)),
  });
  const EmailHeader = IDL.Record({
    'id' : IDL.Nat64,
    'status' : IDL.Nat8,
    'recipient_alias' : IDL.Text,
    'subject' : IDL.Text,
    'recipient' : IDL.Opt(IDL.Principal),
    'created_at' : IDL.Nat64,
    'sender' : IDL.Opt(IDL.Principal),
    'sender_alias' : IDL.Text,
  });
  const EmailBO = IDL.Record({
    'email_body' : EmailBody,
    'email_header' : EmailHeader,
  });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Vec(EmailBO), 'Err' : IDL.Text });
  const ManualReply = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'created_at' : IDL.Nat64,
    'upgraded_at' : IDL.Nat64,
    'custodians' : IDL.Vec(IDL.Principal),
  });
  const QueryWrapper = IDL.Record({
    'trash' : IDL.Opt(IDL.Bool),
    'favorites' : IDL.Opt(IDL.Bool),
    'read' : IDL.Opt(IDL.Bool),
    'send' : IDL.Opt(IDL.Bool),
    'spam' : IDL.Opt(IDL.Bool),
    'offset' : IDL.Nat32,
    'delete' : IDL.Opt(IDL.Bool),
    'limit' : IDL.Nat32,
  });
  const EmailDO = IDL.Record({
    'id' : IDL.Nat64,
    'header_cid' : IDL.Principal,
    'email_body' : EmailBody,
    'email_header' : EmailHeader,
    'body_cid' : IDL.Principal,
    'canister_hash_named' : IDL.Text,
  });
  const Profile = IDL.Record({
    'desc' : IDL.Opt(IDL.Text),
    'avatar_url' : IDL.Opt(IDL.Text),
    'avatar_base64' : IDL.Opt(IDL.Text),
  });
  const HeaderMetaDataDO = IDL.Record({
    'has_attach' : IDL.Bool,
    'recipient_profile' : IDL.Opt(Profile),
    'first_recipient_favorites' : IDL.Opt(IDL.Bool),
    'body_desc' : IDL.Text,
    'first_sender_trash' : IDL.Opt(IDL.Bool),
    'first_sender_alias' : IDL.Text,
    'first_recipient_read' : IDL.Opt(IDL.Bool),
    'first_recipient_spam' : IDL.Opt(IDL.Bool),
    'first_sender_read' : IDL.Opt(IDL.Bool),
    'first_sender_spam' : IDL.Opt(IDL.Bool),
    'first_sender_favorites' : IDL.Opt(IDL.Bool),
    'first_sender_delete' : IDL.Opt(IDL.Bool),
    'sender_profile' : IDL.Opt(Profile),
    'first_recipient_trash' : IDL.Opt(IDL.Bool),
    'first_recipient_delete' : IDL.Opt(IDL.Bool),
    'first_recipient_alias' : IDL.Text,
  });
  const EmailHeaderVo = IDL.Record({
    'total' : IDL.Nat64,
    'data' : IDL.Vec(IDL.Tuple(IDL.Vec(EmailDO), HeaderMetaDataDO)),
    'offset' : IDL.Nat32,
    'limit' : IDL.Nat32,
  });
  const ApiError = IDL.Variant({
    'YouAreNotBindingAnyDmailAlias' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'NotDmailAccount' : IDL.Null,
    'Other' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'Ok' : EmailHeaderVo, 'Err' : ApiError });
  return IDL.Service({
    'batchUpdateDelete' : IDL.Func([IDL.Vec(QueryBatchBo)], [Result], []),
    'batchUpdateFavorites' : IDL.Func(
        [IDL.Bool, IDL.Vec(QueryBatchBo)],
        [Result],
        [],
      ),
    'batchUpdateRead' : IDL.Func(
        [IDL.Bool, IDL.Vec(QueryBatchBo)],
        [Result],
        [],
      ),
    'batchUpdateSpam' : IDL.Func(
        [IDL.Bool, IDL.Vec(QueryBatchBo)],
        [Result],
        [],
      ),
    'batchUpdateTrash' : IDL.Func(
        [IDL.Bool, IDL.Vec(QueryBatchBo)],
        [Result],
        [],
      ),
    'cacheAnWeb2Email' : IDL.Func([EmailBO], [Result], []),
    'createAnEmail' : IDL.Func([IDL.Opt(IDL.Nat64), EmailBO], [Result_1], []),
    'custodians' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'drainAllWeb2EmailCache' : IDL.Func([IDL.Nat64], [Result_2], []),
    'metadata' : IDL.Func([], [ManualReply], ['query']),
    'name' : IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
    'queryEmailListByWrapper' : IDL.Func(
        [IDL.Principal, QueryWrapper],
        [Result_3],
        ['query'],
      ),
    'setCustodians' : IDL.Func([IDL.Vec(IDL.Principal)], [], []),
    'setName' : IDL.Func([IDL.Text], [], []),
    'updateStatus' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat64],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => {
  const InitArgs = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'custodians' : IDL.Opt(IDL.Vec(IDL.Principal)),
  });
  return [IDL.Opt(InitArgs)];
};