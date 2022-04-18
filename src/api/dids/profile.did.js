export const idlFactory = ({ IDL }) => {
  const Profile = IDL.Record({
    'desc' : IDL.Opt(IDL.Text),
    'avatar_url' : IDL.Opt(IDL.Text),
    'avatar_base64' : IDL.Opt(IDL.Text),
  });
  const ContactDetail = IDL.Record({
    'recipient_alias' : IDL.Text,
    'nickname' : IDL.Opt(IDL.Text),
    'princiapl_id' : IDL.Opt(IDL.Principal),
    'profile' : IDL.Opt(Profile),
  });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'NotDmailAccount' : IDL.Null,
    'Other' : IDL.Text,
  });
  const NFTMetadata = IDL.Record({ 'contact_list' : IDL.Vec(ContactDetail) });
  return IDL.Service({
    'create_update_alias_profile' : IDL.Func(
        [IDL.Text, ContactDetail],
        [IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError })],
        [],
      ),
    'create_update_principal_profile' : IDL.Func(
        [IDL.Principal, Profile],
        [IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : ApiError })],
        [],
      ),
    'query_alias_profile_by_key' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Opt(NFTMetadata), 'Err' : ApiError })],
        [],
      ),
    'query_principal_profile_by_pid' : IDL.Func(
        [IDL.Principal],
        [IDL.Variant({ 'Ok' : IDL.Opt(Profile), 'Err' : ApiError })],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };