export function doesUserHasPermission(
  userPermissions: number[],
  permissionIds: number[]
): boolean {
  if (permissionIds?.length) {
    const isPermissionInclued = userPermissions.some((value) =>
      permissionIds?.includes(value)
    );

    return isPermissionInclued;
  }

  return true;
}
