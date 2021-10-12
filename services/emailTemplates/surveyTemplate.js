const keys = require('../../config/keys')

module.exports = (survey) => { //contains all the html for any email we send out
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>I'd like your input!</h3>
                    <p>Plaese answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
                    </div>
                </div>
            </body>
        </html>
`;
};