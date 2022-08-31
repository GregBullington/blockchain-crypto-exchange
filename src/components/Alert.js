const Alert = () => {
    return (
      <div>
          <div className="alert alert--remove">
            <h1>Transaction Pending...</h1>
          </div>
          <div className="alert alert--remove">
            <h1>Transaction Will Fail</h1>
          </div>
          <div className="alert alert--remove">
            <h1>Transaction Successful</h1>
              <a
                href=''
                target='_blank'
                rel='noreferrer'
              >
              </a>
          </div>
        <div className="alert alert--remove"></div>
      </div>
    );
  }
  
  export default Alert;