import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import styles from '@/styles/Events/events.module.css';

interface LargeButtonProps extends ButtonProps {
  children: ReactNode;
}

const LargeButton: React.FC<LargeButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <div className={styles.largeButton}>
      <Button variant="contained" color="primary" {...buttonProps}>
        {children}
      </Button>
    </div>
  );
};

export default LargeButton;
