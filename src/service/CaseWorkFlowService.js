import httpService from "./HttpService";

class CaseWorkFlowService {
  getTrayData = () => {
    return new Promise((resolve, reject) => {
      httpService
        .get("/caseWorkFlow/myTray")
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getMyTrayData = (userRole) => {
    return new Promise((resolve, reject) => {
      httpService
        .get("/caseWorkFlow/myCasesTray/" + userRole)
        .then((data) => {
          resolve(data);
          console.log("dataaa", data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getPendingCases = (
    caseStatus,
    caseRating,
    toDate,
    fromDate,
    accountNo,
    customerId,
    pageNo,
    casesPerPage
  ) => {
    return new Promise((resolve, reject) => {
      console.log('IN SERV');
      httpService
        .post(
          `/caseWorkFlow/pendingCases`,
          {
            caseStatus,
            caseRating,
            toDate,
            fromDate,
            accountNo,
            customerId,
            pageNo,
            casesPerPage,
          },
          null
        )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  getAMLPendingCases = (
    caseType,
    userRole,
    caseRating,
    toDate,
    fromDate,
    accountNo,
    customerId,
    pageNo,
    casesPerPage
  ) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/caseWorkFlow/pendingAMLCases`,
          {
            caseType,
            userRole,
            caseRating,
            toDate,
            fromDate,
            accountNo,
            customerId,
            pageNo,
            casesPerPage,
          },
          null
        )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  getAMLPendingCases = (
    caseType,
    userRole,
    caseRating,
    toDate,
    fromDate,
    accountNo,
    customerId,
    pageNo,
    casesPerPage,   
  ) => {
    console.log("in service");
    return new Promise((resolve, reject) => {
      console.log('IN SERV');
      httpService
        .post(
          `/caseWorkFlow/pendingAMLCases`,
          { caseType,
            userRole,
            caseRating,
            toDate,
            fromDate,
            accountNo,
            customerId,
            pageNo,
            casesPerPage,
          },
          null
        )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };


  getPendingCasesData = (
    fromDate, 
    toDate, 
    alertCode, 
    branchCode,
    accountNo, 
    customerId, 
    hasAnyOldCases, 
    caseRating, 
    fromCaseNo, 
    toCaseNo, 
    userCode, 
    groupCode, 
    ipAddress
  ) => {
    return new Promise((resolve, reject) => {
      console.log(caseRating, "In servicee in");
      httpService
        .post(
          `/caseWorkFlow/getPendingAMLCases`,
          {
            fromDate, 
            toDate, 
            alertCode, 
            branchCode,
            accountNo, 
            customerId, 
            hasAnyOldCases, 
            caseRating, 
            fromCaseNo, 
            toCaseNo, 
            userCode, 
            groupCode, 
            ipAddress
          },
          null
        )
        .then((data) => {
         
          resolve(data);
        })
        .catch((err) => {
         
          reject(err);
          console.log(err);
        });
    });
  };

  getPendingCasesBySelf = (
    fromDate,
    toDate,
    alertCode, 
    branchCode, 
    accountNo, 
    customerId,
    hasAnyOldCases,
    caseRating, 
    fromCaseNo, 
    toCaseNo,
    selectedCaseStatus,
    selectedSubCaseStatus,
    userCode, 
    groupCode,
    ipAddress,
    moduleType
  ) => {
    return new Promise((resolve, reject) => {
      console.log(caseRating, "In servicee in cases by self");
      httpService
        .post(
          `/caseWorkFlow/getPendingAMLCasesBySelf`,
          {
            fromDate,
             toDate,
             alertCode, 
             branchCode, 
             accountNo, 
             customerId,
             hasAnyOldCases,
             caseRating, 
             fromCaseNo, 
             toCaseNo,
             selectedCaseStatus,
             selectedSubCaseStatus,
             userCode, 
             groupCode, 
             ipAddress,
             moduleType
          },
          null
        )
        .then((data) => {
          console.log(caseRating, "CASERATEIT");
          resolve(data);
        })
        .catch((err) => {
          console.log(caseRating, "CASERATEIT");
          reject(err);
          console.log(err);
        });
    });
  };



  getViewComments = (caseNo) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/caseWorkFlow/addViewComments`, { caseNo }, null)
        .then((data) => {
          resolve(data);
          console.log("commentss",data)
         
        })
        .catch((err) => {
          
          reject(err);
          console.log(err);
        });
    });
  };

  saveComments = (username, caseNo, caseStatus, comments, lastReviewDate) => {
    console.log("IN SAVE COMMENTS")
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/caseWorkFlow/saveComments`,
          { username, caseNo, caseStatus, comments, lastReviewDate },
          null
        )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

 /*  saveUserComments = (
    caseStatus,
    userRole,
    actionType,
    caseNo,
    comments,
    lastReviewDate
  ) => {
    return new Promise((resolve, reject) => {
      console.log("saving commentsz ");
      console.log("IN SAVE COMMENTS");
      console.log("role", userRole + "" + "action", actionType + "casestatus", caseStatus+ "username", username + "comment", comments);
      httpService
        .post(
          `/caseWorkFlow/saveUserComments`,
          { caseStatus,
            userRole,
            actionType,
            caseNo,
            comments,
            lastReviewDate
          },
          null
        )
        .then((data) => {
          resolve(data);

          console.log(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };
 */
  saveUserComments = (caseStatus, userRole, actionType, caseNo, comments, lastReviewDate) => {
    return new Promise((resolve, reject) => {
      console.log("saving commentsz IN LATEST");
      httpService
        .post(
          `/caseWorkFlow/saveUserComments`,
          { caseStatus, userRole, actionType, caseNo, comments, lastReviewDate },
          null
        )
        .then((data) => {
          resolve(data);
          console.log(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };


  getViewCommentsDetails = (caseNo, caseStatus, userCode, userRole, ipAddress) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/caseWorkFlow/viewCommentsDetails`, { caseNo , caseStatus, userCode, userRole, ipAddress}, null)
        .then((data) => {
          resolve(data);
          console.log("commentss",data)
         
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  }

saveAndCloseComments = ( userCode, 
userRole, 
ipAddress,
caseNo,
caseStatus,
flagType,
comments,
fraudIndicator,
removalReason,
outcomeIndicator,
highRiskReasonCode,
addedToFalsePositive,
lastReviewDate,
userActionType,
amlUserAddToMarkAll,
reassignToUserCode,
alertNos,
assignedBranchCode,
fromDate, 
toDate, 
alertCode, 
branchCode, 
accountNo,
customerId,
hasAnyOldCases, 
caseRating,
fromCaseNo,
toCaseNo  ) => {
  return new Promise((resolve, reject) => {
    console.log("saving commentsz IN LATEST");
    console.log(caseRating)
    httpService
      .post(
        `/caseWorkFlow/saveCommentsDetails`,
        { userCode, 
          userRole, 
          ipAddress,
          caseNo,
          caseStatus,
          flagType,
          comments,
          fraudIndicator,
          removalReason,
          outcomeIndicator,
          highRiskReasonCode,
          addedToFalsePositive,
          lastReviewDate,
          userActionType,
          amlUserAddToMarkAll,
          reassignToUserCode,
          alertNos,
          assignedBranchCode,
          fromDate, 
          toDate, 
          alertCode, 
          branchCode, 
          accountNo,
          customerId,
          hasAnyOldCases, 
          caseRating,
          fromCaseNo,
          toCaseNo  },
        null
      )
      .then((data) => {
        resolve(data);
        console.log(data);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};
}

const instance = new CaseWorkFlowService();
export default instance;
