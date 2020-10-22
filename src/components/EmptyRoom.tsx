import * as React from 'react';
import './EmptyRoom.css';

const EmptyRoom: React.FC<any> = ({ position, onAddRoom, mirror }) => {
    if (mirror) {
        return <div/>
    }
    return <div className='emptyRoom'>
        <button className='addRoom' onClick={() => onAddRoom(position)}>
            +
        </button>
    </div>
}

export default EmptyRoom;
