import React from 'react';

function alert_class (type = 'success') {
    const classes = {
        error: 'alert-danger',
        alert: 'alert-warning',
        notice: 'alert-info',
        success: 'alert-success'
    };
  return classes[type];
}

const Alert = ({message, delete_flash_message}) => {
    const alert_class_name = `alert ${alert_class(message.type)} fade in`;
    return (
        <div className={alert_class_name} role='alert'>
            <button
                className='close'
                onClick={delete_flash_message}
                data-dismiss='alert'>
                &times;
            </button>
            {message.text}
        </div>
    )
}

const flash_messages = ({messages, delete_flash_message}) => {
    const alerts = messages.map((message, index) => {
        return (
            <Alert
                key={index}
                delete_flash_message={() => delete_flash_message(index)}
                message={message} />
        )
    });

    return (
        <div>
          {alerts}
        </div>
    );
}

export default flash_messages