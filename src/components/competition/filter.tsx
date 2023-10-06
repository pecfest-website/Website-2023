import { useState, useEffect } from 'react';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import styles from '../../styles/Competition/Filters.module.css';

type FilterPropType = {
  filterValue: any;
  onSelectFilters: any;
  onDeSelectFilters: any;
  color: string;
  eventType: string;
}

const Filters = ({filterValue, onSelectFilters, onDeSelectFilters, color, eventType} : FilterPropType) => {
  const [active, setActive] = useState(false);
  const [buttonType, setButtonType] = useState<'text' | 'contained'>('text');

  useEffect(() => {
    setButtonTypeFromListing();
  }, []);

  const setButtonTypeFromListing = () => {
    if (filterValue === eventType) setButtonType('contained');
  };

  return (
    <>
      <Button
        variant={buttonType}
        style={{ marginRight: 15, marginTop: 4, color: 'white' }}
        className={styles.activeTagStyle}
        startIcon={<EventIcon style={{ color: 'white' }} />}
        onClick={() => {
          if (!active) {
            onSelectFilters(filterValue);
            setActive(true);
            setButtonType('contained');
          } else {
            onDeSelectFilters(filterValue);
            setActive(false);
            setButtonType('text');
          }
        }}
      >
        {filterValue}
      </Button>
    </>
  );
};
export default Filters;