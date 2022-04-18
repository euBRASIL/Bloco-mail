export const idlFactory = ({ IDL }) => {
  const FileInfo = IDL.Record({
    'id' : IDL.Nat64,
    'cid' : IDL.Opt(IDL.Principal),
    'owner_alias' : IDL.Text,
    'mime_type' : IDL.Text,
    'created_at' : IDL.Nat64,
    'file_name' : IDL.Text,
    'file_size' : IDL.Nat,
    'blob_content' : IDL.Vec(IDL.Nat8),
  });
  const FileVo = IDL.Record({ 'id' : IDL.Nat64, 'cid' : IDL.Principal });
  const ApiError = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Text,
  });
  return IDL.Service({
    'create_update_attachment' : IDL.Func(
        [FileInfo],
        [IDL.Variant({ 'Ok' : FileVo, 'Err' : ApiError })],
        [],
      ),
    'query_attachment_by_id' : IDL.Func(
        [IDL.Text, IDL.Nat64, IDL.Principal],
        [IDL.Variant({ 'Ok' : IDL.Opt(FileInfo), 'Err' : ApiError })],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };