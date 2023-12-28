
const isValidUser = (data) => {

    if (data === undefined) {
        return false;
    }

    return (
        typeof data.empno === "number" &&
        typeof data.ename === "string" &&
        typeof data.job === "string" &&
        typeof data.mgr === "number" || data.mgr === null  &&
        typeof data.hiredate === "string" &&
        typeof data.sal === "number" &&
        typeof data.comm === "number" || data.comm === null &&
        typeof data.deptno === "number"
    );
}

module.exports = {
    isValidUser: isValidUser
}