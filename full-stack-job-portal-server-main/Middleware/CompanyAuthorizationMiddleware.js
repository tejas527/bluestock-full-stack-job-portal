const companyAuthorizationHandler = (...allowedRoles) => {
    return (req, res, next) => {
        const companyRole = req?.user?.role;

        if (!allowedRoles.includes(companyRole)) {
            return res.status(403).json({
                status: false,
                message: "You don't have permission to perform this action.",
            });
        }

        next();
    };
};

module.exports = {
    companyAuthorizationHandler,
};
