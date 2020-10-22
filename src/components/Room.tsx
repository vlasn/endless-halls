import * as React from 'react';
import cn from 'classnames';

import RoomIcon from './RoomIcon';
import RoomText from './RoomText';

import './Room.css';
// come up with a type for room walls
export type TRoomWall = 'east' | 'west' | 'north' | 'south';
export type TRoomColor = string;
export type TRoomVariety = string;

export interface IRoomProps {
  walls: TRoomWall[];
  variety: TRoomVariety;
  color: TRoomColor;
  position: string;
  onChangeRoom: (position: string, color: TRoomColor, variety: TRoomVariety, walls: TRoomWall[]) => void;
  mirror?: boolean;
}

const roomTypes = [
    'normal',
    'spawn',
    'torch',
    'rune',
    'crossing'
];

const roomColors = [
    'blue',
    'purple',
    'yellow',
    'red',
    'green',
    'blank'
]

const getWallClassnames = (walls: TRoomWall[]) => walls.map(w => `border-${String(w)}`)

const renderRoomContent: (variety: TRoomVariety, color: TRoomColor) => React.ReactNode =
    (variety, color) => {
    switch(true) {
        case variety === 'torch':
            return <RoomIcon icon={'torch'} fill={color}/>
        case variety === 'rune':
            return <RoomIcon icon={'rune'} fill={color}/>
        case ['spawn', 'crossing'].includes(variety):
            return <RoomText variety={variety}/>
        default:
            return ''
    }
}

const Room: React.FC<IRoomProps> = ({ position, walls, variety, color, onChangeRoom, mirror }) => {
    const changeColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeRoom(position, event.currentTarget.value, variety, walls);
    }
    const changeVariety = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeRoom(position, color, event.currentTarget.value, walls);
    }

    const wallButtonClasses = (explicit: string, wallLocation: TRoomWall) => {
        return cn({ [explicit]: true, wallActive: walls.includes(wallLocation) })
    }

    const toggleWallActive = (direction: TRoomWall) => {
        const newWalls = walls.includes(direction) ? walls.filter(w => w !== direction) : [...walls, direction]
        onChangeRoom(position, color, variety, newWalls)
    }

    return (
        <div className={cn("roomWrapper", { mirror })}>
            <div className={cn('roomWithOptions')}>
                <button 
                  className={wallButtonClasses("wallTop", "north")}
                  onClick={() => toggleWallActive('north')}
                />
                <button 
                  className={wallButtonClasses("wallLeft", "west")}
                  onClick={() => toggleWallActive('west')}
                />
                <div className="roomOptions">
                    <select
                    value={String(variety)}
                    onChange={changeVariety}
                    >
                        { roomTypes.map((type, i) => {
                            return <option value={type} key={i}>{type}</option>
                        }) }
                    </select>
                    <select
                        value={String(color)}
                        onChange={changeColor}
                    >
                        { roomColors.map((type, i) => {
                            return <option value={type} key={i}>{type}</option>
                        }) }
                    </select>

                </div>
                <button 
                  className={wallButtonClasses("wallRight", "east")}
                  onClick={() => toggleWallActive('east')}
                />
                <button 
                  className={wallButtonClasses("wallBottom", "south")}
                  onClick={() => toggleWallActive('south')}
                />

            </div>
            <div className={cn('roomInactive', ...getWallClassnames(walls))}>
                {renderRoomContent(variety, color)}
            </div>
        </div>
    )
}

export default Room;
