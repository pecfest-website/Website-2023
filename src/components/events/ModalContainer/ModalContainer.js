import React, { useEffect, useState } from 'react'
import style from '@/styles/Events/ModalContainer/modalContainer.module.css';

const ModalContainer = ({
    isOpen = true,
    children,
    className = '',
    close,
    padding = 0,
}) => {
    const modstyle={padding: padding, ...style}
    const [onOutside, setOnOutside] = useState(true);

    return (
        <>
            {isOpen &&
                <div 
                    className={style.modalContainer}
                    onMouseDown={() => onOutside && close()}
                >
                    <div 
                        className={style.modalBox} 
                        style={modstyle} 
                        onMouseEnter={() => setOnOutside(false)}
                        onMouseLeave={() => setOnOutside(true)}
                    >
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default ModalContainer;