const keys = require('../../config/keys')

//contains html for emails sent out:
module.exports = (survey) => {
    return `
    <!DOCTYPE html>
        <html>
            <body style="text-align: center; font-family: Colfax,Helvetica,Arial,sans-serif;">
                <div style="background-color: #eceff1;">
                    <h2>We'd like your input!</h2>
                    <p style="font-size: 15px;">Plaese answer the following question:</p>
                    <p style="font-size: 18px; color: #f50057;"><b>${survey.body}</b></p>
                    <div>
                        <span>
                            <a href="${keys.redirectDomain}/surveys/thanks/${survey.id}/strongpositive" width:"70px" style="text-decoration: none;"><img src="${keys.sendGridEmailTemplateImg.strongPositive}" width="50px" height="50px"></img></a>
                        </span>
                        <span width="15px"></span>
                        <span>
                            <a href="${keys.redirectDomain}/surveys/thanks/${survey.id}/positive" width:"70px" style="text-decoration: none;"><img src="${keys.sendGridEmailTemplateImg.positive}" alt="positive" width="50px" height="50px"></img></a>
                        </span>
                        
                        <span>
                            <a href="${keys.redirectDomain}/surveys/thanks/${survey.id}/neutral" width:"70px" style="text-decoration: none;"><img src="${keys.sendGridEmailTemplateImg.neutral}" alt="neutral" width="50px" height="50px"></img></a>
                        </span>
                        
                        <span>
                            <a href="${keys.redirectDomain}/surveys/thanks/${survey.id}/negative" width:"70px" style="text-decoration: none;"><img src="${keys.sendGridEmailTemplateImg.negative}" alt="negative" width="50px" height="50px"></img></a>
                        </span>
                        
                        <span>
                            <a href="${keys.redirectDomain}/surveys/thanks/${survey.id}/strongnegative" width:"70px" style="text-decoration: none;"><img src="${keys.sendGridEmailTemplateImg.strongNegative}" alt="strong-negative" width="50px" height="50px"></img></a>
                        </span>
                    </div>
                </div>
            </body>
        </html>
`;
};