import {X} from 'lucide-react';
import {ModalProps} from '../../../../types/types';

const Filter = ({closeModal}: ModalProps) => {
  return (
    <div className='filter'>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <div className=''>Filter Works!</div>
    </div>
  );
};

export default Filter;
