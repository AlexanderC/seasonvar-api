class FailedToObtainSecurityMark extends Error {
  constructor() {
    super(`Failed to obtain security mark.`);
  }
}

module.exports = FailedToObtainSecurityMark;