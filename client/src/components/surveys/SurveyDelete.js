import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";

import { deleteSurvey } from "../../actions";
import Modal from "../Modal";

const SurveyDelete = (props) => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isHovering, setIsHovering] = useState(false);

    const selectedSurvey = useSelector(state => state.surveys.find(survey => survey._id === id));

    const handleDeleteClick = () => {
        dispatch(deleteSurvey(id));
        history.push('/surveys');
    }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

    const renderActions = () => {
        return (
            <React.Fragment>
                <button onClick={() => handleDeleteClick()} className="btn">Delete</button>
                <Link
                    to='/surveys'
                    style={{ marginLeft: '20px' }}
                    className={`btn white-text right ${isHovering ? 'grey darken-1' : 'grey'}`}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >Cancel</Link>
            </React.Fragment>
        )
    }

    const renderContent = () => {
        if (!selectedSurvey) {
            return 'Are you sure you want to delete this survey?'
        }
        return `Are you sure you want to delete the survey titled: ${selectedSurvey.title}?`
    }

    return (
        //passing details down props to make Modal reusable:
        <Modal
            title="Delete Survey"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => history.push('/surveys')}
        />
        )
}

export default SurveyDelete;