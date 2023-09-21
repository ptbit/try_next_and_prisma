import Link from "next/link";
const Header = () => {
  return (
    <header className="border flex flex-row justify-between">
      <div className="px-20 self-center flex text-2xl cursor-pointer">
        <Link href="/">LOGO</Link>
      </div>
      <nav className="px-10">
        <ul className="flex justify-between gap-2">
          <Link href="/" className="px-10 py-2 border cursor-pointer">
            <li>Home</li>
          </Link>
          {/* <Link href="/users" className="px-10 py-2 border cursor-pointer">
            <li>Users</li>
          </Link>
          <Link href="/posts" className="px-10 py-2 border cursor-pointer">
            <li>Posts</li>
          </Link> */}
          <Link href="/tools" className="px-10 py-2 border cursor-pointer">
            <li>Tools</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
