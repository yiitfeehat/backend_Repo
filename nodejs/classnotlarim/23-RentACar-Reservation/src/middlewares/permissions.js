"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Middleware: permissions
const message = "Your account is not active. Please contact support.";
const CustomError = require("../errors/customError");

function getUserInfo(req) {
  const user = req.user;
  const isActive = user?.isActive;
  const isAdmin = user?.isAdmin;
  const isStaff = user?.isStaff;

  return { user, isActive, isAdmin, isStaff };
}

module.exports = {

  isLogin: (req, res, next) => {
    const { user, isActive } = getUserInfo(req);

    if (user && isActive) {
      next();
    } else {
      throw new CustomError(
        "AuthenticationError: You must be logged in to access this resource.",
        403
      );
    }
  },

  isStaffOrisAdmin: (req, res, next) => {
    const { isActive, isAdmin, isStaff } = getUserInfo(req);

    if (!(isAdmin || isStaff)) {
      throw new CustomError(
        "AuthorizationError: You must be an Admin or Staff to access this resource.",
        403
      );
    }

    if (!isActive) {
      throw new CustomError(message, 403);
    }

    next();
  },

  isAdmin: (req, res, next) => {
    const { isActive, isAdmin } = getUserInfo(req);

    if (isAdmin && isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error(
        "AuthorizationError: You must be an Admin to access this resource."
      );
    }
  }

};
