
function App() {
  return (
    <div>
      <h1>React Data Types Practice</h1>

      {/* String Components */}
      <Name />
      <City />
      <College />
      <Language />
      <Framework />
      <Country />
      <Movie />
      <Food />
      <Greeting />
      <Subject />

      {/* Number Components */}
      <Age />
      <Marks />
      <Salary />
      <Price />
      <Year />
      <Score />
      <Rank />
      <Height />
      <Weight />
      <Quantity />

      {/* Boolean Components */}
      <Login />
      <Vote />
      <Payment />
      <OnlineStatus />
      <Subscription />
      <Exam />
      <Delivery />
      <Battery />
      <Attendance />
      <Internet />

      {/* Optional Chaining Components */}
      <UserName />
      <UserCity />
      <UserEmail />
      <ProductPrice />
      <MovieTitle />
      <EmployeeDept />
      <StudentMark />
      <CarBrand />
      <LaptopName />
      <PhoneModel />

      {/* Null / Undefined Components */}
      <NullExample1 />
      <UndefinedExample1 />
      <NullMessage />
      <UndefinedMessage />
      <EmptyData />
      <EmptyProfile />
      <NullCheck />
      <UndefinedCheck />
      <MissingValue />
      <MissingName />
    </div>
  );
}

/* ================= STRING ================= */

function Name() {
  return <h2>Prasanth</h2>;
}

function City() {
  return <h2>Chennai</h2>;
}

function College() {
  return <h2>Engineering College</h2>;
}

function Language() {
  return <h2>JavaScript</h2>;
}

function Framework() {
  return <h2>React</h2>;
}

function Country() {
  return <h2>India</h2>;
}

function Movie() {
  return <h2>Interstellar</h2>;
}

function Food() {
  return <h2>Biryani</h2>;
}

function Greeting() {
  return <h2>Hello World</h2>;
}

function Subject() {
  return <h2>Database Management</h2>;
}

/* ================= NUMBER ================= */

function Age() {
  return <h2>{21}</h2>;
}

function Marks() {
  return <h2>{95}</h2>;
}

function Salary() {
  return <h2>{50000}</h2>;
}

function Price() {
  return <h2>{299}</h2>;
}

function Year() {
  return <h2>{2026}</h2>;
}

function Score() {
  return <h2>{450}</h2>;
}

function Rank() {
  return <h2>{1}</h2>;
}

function Height() {
  return <h2>{175}</h2>;
}

function Weight() {
  return <h2>{70}</h2>;
}

function Quantity() {
  return <h2>{10}</h2>;
}

/* ================= BOOLEAN ================= */

function Login() {
  const isLoggedIn = true;
  return <h2>{isLoggedIn ? "Welcome User" : "Please Login"}</h2>;
}

function Vote() {
  const eligible = false;
  return <h2>{eligible ? "Can Vote" : "Cannot Vote"}</h2>;
}

function Payment() {
  const paid = true;
  return <h2>{paid ? "Payment Success" : "Payment Failed"}</h2>;
}

function OnlineStatus() {
  const online = false;
  return <h2>{online ? "Online" : "Offline"}</h2>;
}

function Subscription() {
  const subscribed = true;
  return <h2>{subscribed ? "Premium User" : "Free User"}</h2>;
}

function Exam() {
  const passed = true;
  return <h2>{passed ? "Pass" : "Fail"}</h2>;
}

function Delivery() {
  const delivered = false;
  return <h2>{delivered ? "Delivered" : "Pending"}</h2>;
}

function Battery() {
  const charging = true;
  return <h2>{charging ? "Charging" : "Not Charging"}</h2>;
}

function Attendance() {
  const present = false;
  return <h2>{present ? "Present" : "Absent"}</h2>;
}

function Internet() {
  const connected = true;
  return <h2>{connected ? "Connected" : "Disconnected"}</h2>;
}

/* ================= OPTIONAL CHAINING ================= */

function UserName() {
  const user = { name: "Prasanth" };
  return <h2>{user?.name}</h2>;
}

function UserCity() {
  const user = { city: "Chennai" };
  return <h2>{user?.city}</h2>;
}

function UserEmail() {
  const user = null;
  return <h2>{user?.email}</h2>;
}

function ProductPrice() {
  const product = { price: 500 };
  return <h2>{product?.price}</h2>;
}

function MovieTitle() {
  const movie = undefined;
  return <h2>{movie?.title}</h2>;
}

function EmployeeDept() {
  const employee = { dept: "IT" };
  return <h2>{employee?.dept}</h2>;
}

function StudentMark() {
  const student = { mark: 90 };
  return <h2>{student?.mark}</h2>;
}

function CarBrand() {
  const car = null;
  return <h2>{car?.brand}</h2>;
}

function LaptopName() {
  const laptop = { name: "ASUS" };
  return <h2>{laptop?.name}</h2>;
}

function PhoneModel() {
  const phone = undefined;
  return <h2>{phone?.model}</h2>;
}

/* ================= NULL / UNDEFINED ================= */

function NullExample1() {
  const data = null;
  return <h2>{data}</h2>;
}

function UndefinedExample1() {
  const value = undefined;
  return <h2>{value}</h2>;
}

function NullMessage() {
  const user = null;
  return <h2>{user === null ? "No User" : user}</h2>;
}

function UndefinedMessage() {
  const age = undefined;
  return <h2>{age === undefined ? "Age Missing" : age}</h2>;
}

function EmptyData() {
  const data = null;
  return <h2>{data ?? "No Data Available"}</h2>;
}

function EmptyProfile() {
  const profile = undefined;
  return <h2>{profile ?? "Profile Empty"}</h2>;
}

function NullCheck() {
  const item = null;
  return <h2>{item ? item : "Item Not Found"}</h2>;
}

function UndefinedCheck() {
  const result = undefined;
  return <h2>{result ? result : "No Result"}</h2>;
}

function MissingValue() {
  const value = null;
  return <h2>{value ?? "Default Value"}</h2>;
}

function MissingName() {
  const name = undefined;
  return <h2>{name ?? "Anonymous"}</h2>;
}

export default App;
