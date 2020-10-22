import * as React from 'react';
import Room, { TRoomColor,
    TRoomVariety,
    TRoomWall } from './Room';
import EmptyRoom from './EmptyRoom';
import './Rooms.css';

const ten = Array.from({ length: 10 }).map((_, i) => i - 1);

const Rooms: React.FC<any> = () => {
    const [rooms, setRooms] = React.useState<any>(JSON.parse(String(localStorage.getItem('endlessHallsRooms'))) || {});

    React.useEffect(() => {
        if (Object.keys(rooms).length) {
            localStorage.setItem('endlessHallsRooms', JSON.stringify(rooms));
        }
    }, [rooms])
    const addRoom = (key: string) => {
        setRooms((prevRooms: {}) => ({...prevRooms, [key]: {
            walls: [],
            roomType: null,
            roomColor: null
        }}))
    };

    const clearAll = () => {
        localStorage.setItem('endlessHallsRooms', JSON.stringify({}));
        setRooms({});
    }

    const changeRoom = (position: string, color: TRoomColor, variety: TRoomVariety, walls: TRoomWall[]) => {
        setRooms((prevRooms: {}) => ({
            ...prevRooms,
            [position] : {
                color,
                variety,
                walls
            }
        }))
    }

    const renderMirrorRoom = (x: number, y: number, roomData: any) => {
        const key = `mirror-${x}:${y}`;
        return (
            <Room
                key={key}
                position={key}
                onChangeRoom={changeRoom}
                walls={roomData.walls}
                variety={roomData.variety}
                color={roomData.color}
                mirror={true}
            />
        )
    }

    const getRoom = (x: number, y: number) => {
        const key = `${x}:${y}`;
        if ([-1, 8].includes(y)) {
            const mirroredY = (y + 8) % 8;
            const mirroredX = (x + 4) % 8;
            const mirrorKey = `${mirroredX}:${mirroredY}`
            if (rooms.hasOwnProperty(mirrorKey)) {
                const roomData = rooms[mirrorKey];
                return renderMirrorRoom(x, y, roomData);
            }
            return <EmptyRoom position={`${x}:${y}`} mirror/>
        }

        if ([-1, 8].includes(x)) {
            const mirroredY = (y + 4) % 8;
            const mirroredX = (x + 8) % 8;
            const mirrorKey = `${mirroredX}:${mirroredY}`
            if (rooms.hasOwnProperty(mirrorKey)) {
                const roomData = rooms[mirrorKey];
                return renderMirrorRoom(x, y, roomData);
            }
            return <EmptyRoom position={`${x}:${y}`} mirror/>
        }

        if (rooms.hasOwnProperty(key)) {
            const roomData = rooms[key];
            return (
                <Room
                    key={key}
                    position={key}
                    onChangeRoom={changeRoom}
                    walls={roomData.walls}
                    variety={roomData.variety}
                    color={roomData.color}
                />)
        }
        return <EmptyRoom position={`${x}:${y}`} onAddRoom={addRoom}/>
    }
    return (
        <React.Fragment>
            <section className='rooms'>
                { ten.map((x) => {
                    return ten.map((y) => {
                    return getRoom(x, y)
                    });
                })}
            </section>
            <button onClick={clearAll}>Clear</button>
        </React.Fragment>

    )
}

export default Rooms;
