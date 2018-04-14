class FailedToObtainSecurityMark extends Error {
  /**
   * @param {string} reason 
   */
  constructor(reason) {
    super(`Failed to obtain security mark: ${ reason }`);
  }
}

module.exports = FailedToObtainSecurityMark;