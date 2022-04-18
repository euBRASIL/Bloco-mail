export const idlFactory = ({ IDL }) => {
  const TxError = IDL.Variant({
    'InsufficientAllowance' : IDL.Null,
    'InsufficientBalance' : IDL.Null,
    'ErrorOperationStyle' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'LedgerTrap' : IDL.Null,
    'ErrorTo' : IDL.Null,
    'Other' : IDL.Text,
    'BlockUsed' : IDL.Null,
    'AmountTooSmall' : IDL.Null,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TxError });
  const ApiError = IDL.Variant({
    'NotBindingEmailAlias' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Text,
  });
  const EmailHeader = IDL.Record({
    'recipient_alias' : IDL.Text,
    'subject' : IDL.Text,
    'recipient' : IDL.Principal,
    'sender' : IDL.Principal,
    'update_at' : IDL.Nat64,
    'sender_alias' : IDL.Text,
  });
  const Email = IDL.Record({
    'email_header_canister_id' : IDL.Principal,
    'level' : IDL.Nat8,
    'parent_id' : IDL.Nat64,
    'email_header' : EmailHeader,
    'email_id' : IDL.Nat64,
    'email_body_canister_id' : IDL.Principal,
  });
  const Profile = IDL.Record({
    'desc' : IDL.Opt(IDL.Text),
    'avatar_url' : IDL.Opt(IDL.Text),
    'avatar_base64' : IDL.Opt(IDL.Text),
  });
  const EmailSession = IDL.Record({
    'has_attach' : IDL.Bool,
    'trash' : IDL.Bool,
    'current_canister_id' : IDL.Principal,
    'session_id' : IDL.Nat64,
    'favorites' : IDL.Bool,
    'read' : IDL.Bool,
    'spam' : IDL.Bool,
    'last_header' : EmailHeader,
    'email_list' : IDL.Vec(Email),
    'canister_hash_named' : IDL.Text,
    'sender_avatar' : IDL.Opt(Profile),
    'last_body_desc' : IDL.Text,
  });
  const Metadata = IDL.Record({
    'fee' : IDL.Nat,
    'decimals' : IDL.Nat8,
    'owner' : IDL.Principal,
    'logo' : IDL.Text,
    'name' : IDL.Text,
    'totalSupply' : IDL.Nat,
    'symbol' : IDL.Text,
  });
  const TokenInfo = IDL.Record({
    'holderNumber' : IDL.Nat64,
    'deployTime' : IDL.Nat64,
    'metadata' : Metadata,
    'historySize' : IDL.Nat64,
    'cycles' : IDL.Nat64,
    'feeTo' : IDL.Principal,
  });
  const QueryWrapper = IDL.Record({
    'trash' : IDL.Bool,
    'favorites' : IDL.Bool,
    'read' : IDL.Bool,
    'send' : IDL.Bool,
    'spam' : IDL.Bool,
    'offset' : IDL.Nat32,
    'limit' : IDL.Nat32,
  });
  const R = IDL.Record({
    'total' : IDL.Nat64,
    'data' : IDL.Vec(EmailSession),
    'offset' : IDL.Nat32,
    'limit' : IDL.Nat32,
  });
  return IDL.Service({
    'allowance' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'approve' : IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'burn' : IDL.Func([IDL.Nat], [Result], []),
    'change_favorites' : IDL.Func(
        [IDL.Bool, IDL.Vec(IDL.Nat64)],
        [IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError })],
        [],
      ),
    'change_read' : IDL.Func(
        [IDL.Bool, IDL.Vec(IDL.Nat64)],
        [IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError })],
        [],
      ),
    'change_spam' : IDL.Func(
        [IDL.Bool, IDL.Vec(IDL.Nat64)],
        [IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError })],
        [],
      ),
    'change_trash' : IDL.Func(
        [IDL.Bool, IDL.Vec(IDL.Nat64)],
        [IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError })],
        [],
      ),
    'create_update_an_email_header' : IDL.Func(
        [EmailSession],
        [IDL.Variant({ 'Ok' : IDL.Opt(EmailSession), 'Err' : ApiError })],
        [],
      ),
    'decimals' : IDL.Func([], [IDL.Nat8], ['query']),
    'getAllowanceSize' : IDL.Func([], [IDL.Nat64], ['query']),
    'getHolders' : IDL.Func(
        [IDL.Nat64, IDL.Nat64],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
        ['query'],
      ),
    'getMetadata' : IDL.Func([], [Metadata], ['query']),
    'getTokenInfo' : IDL.Func([], [TokenInfo], ['query']),
    'getUserApprovals' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
        ['query'],
      ),
    'historySize' : IDL.Func([], [IDL.Nat64], ['query']),
    'logo' : IDL.Func([], [IDL.Text], ['query']),
    'mint' : IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'owner' : IDL.Func([], [IDL.Principal], ['query']),
    'query_all' : IDL.Func([], [IDL.Vec(Email)], []),
    'query_header_by_id' : IDL.Func([IDL.Nat64], [IDL.Opt(Email)], []),
    'query_header_list_by_pid' : IDL.Func(
        [IDL.Principal, QueryWrapper],
        [IDL.Variant({ 'Ok' : R, 'Err' : ApiError })],
        [],
      ),
    'setFee' : IDL.Func([IDL.Nat], [], []),
    'setFeeTo' : IDL.Func([IDL.Principal], [], []),
    'setLogo' : IDL.Func([IDL.Text], [], []),
    'setName' : IDL.Func([IDL.Text], [], []),
    'setOwner' : IDL.Func([IDL.Principal], [], []),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => {
  return [
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Nat8,
    IDL.Nat,
    IDL.Principal,
    IDL.Nat,
    IDL.Principal,
    IDL.Principal,
  ];
};
