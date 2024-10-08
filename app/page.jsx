import Heading from '@/components/Heading';
import RoomCard from '@/components/RoomCard';
import rooms from '@/data/rooms.json';

export default function Home() {
  console.log(rooms[0].name);
  return (
    <>
      <Heading title={'Available Rooms'} />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} />)
      ) : (
        <div>No rooms found</div>
      )}
    </>
  );
}
