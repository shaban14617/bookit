import getMyRooms from '@/app/actions/getMyRooms';
import Heading from '@/components/Heading';
import MyRoomCard from '@/components/MyRoomCard';
import RoomCard from '@/components/RoomCard';

async function MyRooms() {
  const rooms = await getMyRooms();

  return (
    <>
      <Heading title={'My Rooms'} />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard room={room} key={room.$id} />)
      ) : (
        <div>No rooms found</div>
      )}
    </>
  );
}

export default MyRooms;
