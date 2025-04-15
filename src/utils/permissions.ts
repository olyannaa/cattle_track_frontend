export enum Permissions {
    AnimalEditTable = 'animal table edit',
    Test = 'test',
}

export const CheckPermissions = (arr: string[], permission: string): boolean => {
    if (!arr.length) {
        return false;
    }

    return !!arr.find((permissionCurr) => permissionCurr === permission);
};
