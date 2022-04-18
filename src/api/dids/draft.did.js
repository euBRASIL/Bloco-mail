export const idlFactory = ({ IDL }) => {
  const InitArgs = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'custodians' : IDL.Opt(IDL.Vec(IDL.Principal)),
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
    'recipient_alias' : IDL.Text,
    'body_desc' : IDL.Text,
    'subject' : IDL.Text,
    'recipient' : IDL.Opt(IDL.Principal),
    'created_at' : IDL.Nat64,
    'sender' : IDL.Opt(IDL.Principal),
    'sender_alias' : IDL.Text,
  });
  const Email = IDL.Record({
    'email_body' : EmailBody,
    'email_header' : EmailHeader,
  });
  const ManualReply = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'created_at' : IDL.Nat64,
    'upgraded_at' : IDL.Nat64,
    'custodians' : IDL.Vec(IDL.Principal),
  });
  const EmailDraft = IDL.Record({
    'id' : IDL.Nat64,
    'cid' : IDL.Principal,
    'pid' : IDL.Principal,
    'email' : Email,
  });
  const Result_1 = IDL.Variant({
    'Ok' : IDL.Opt(EmailDraft),
    'Err' : IDL.Text,
  });
  const QueryWrapper = IDL.Record({
    'offset' : IDL.Nat32,
    'limit' : IDL.Nat32,
  });
  const EmailDraftVo = IDL.Record({
    'total' : IDL.Nat64,
    'data' : IDL.Vec(EmailDraft),
    'offset' : IDL.Nat32,
    'limit' : IDL.Nat32,
  });
  const Result_2 = IDL.Variant({ 'Ok' : EmailDraftVo, 'Err' : IDL.Text });
  return IDL.Service({
    'createAnEmailFromDraft' : IDL.Func(
        [IDL.Principal, IDL.Nat64],
        [Result],
        [],
      ),
    'createUpdateAnEmailDraft' : IDL.Func(
        [IDL.Opt(IDL.Nat64), IDL.Principal, Email],
        [Result],
        [],
      ),
    'custodians' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'deleteDraftById' : IDL.Func(
        [IDL.Principal, IDL.Vec(IDL.Nat64)],
        [Result],
        [],
      ),
    'metadata' : IDL.Func([], [ManualReply], ['query']),
    'name' : IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
    'queryDraftById' : IDL.Func(
        [IDL.Principal, IDL.Nat64],
        [Result_1],
        ['query'],
      ),
    'queryDraftByWrapper' : IDL.Func(
        [IDL.Principal, QueryWrapper],
        [Result_2],
        ['query'],
      ),
    'setCustodians' : IDL.Func([IDL.Vec(IDL.Principal)], [], []),
    'setName' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => {
  const InitArgs = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'custodians' : IDL.Opt(IDL.Vec(IDL.Principal)),
  });
  return [IDL.Opt(InitArgs)];
};