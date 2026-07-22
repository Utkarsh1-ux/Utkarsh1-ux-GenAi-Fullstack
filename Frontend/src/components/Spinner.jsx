import './Spinner.scss';

const Spinner = ({ size = 'default' }) => {
    return (
        <div className={`spinner-container spinner-${size}`}>
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
