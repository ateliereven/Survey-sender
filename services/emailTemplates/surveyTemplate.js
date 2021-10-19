const keys = require('../../config/keys')

//contains all the html for any email we send out:
module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>I'd like your input!</h3>
                    <p>Plaese answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
`;
};