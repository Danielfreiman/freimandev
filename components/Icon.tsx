const paths: Record<string, string> = {
  terminal: "M4 17l6-5-6-5v3l3 2-3 2v3zm7 1h9v-2h-9v2z",
  chat: "M4 4h16v12H7l-3 3V4zm3 5h10V7H7v2zm0 4h7v-2H7v2z",
  menu: "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z",
  close: "M6.4 5L5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6 6.4 5z",
  ads_click: "M11 2h2v3h-2V2zm6 4 1-1 2 2-1 1-2-2zM19 11h3v2h-3v-2zM5 11v2H2v-2h3zm7-4a5 5 0 0 1 4 8l4 4-2 2-4-4a5 5 0 1 1-2-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  shopping_bag: "M7 7V6a5 5 0 0 1 10 0v1h3v15H4V7h3zm2 0h6V6a3 3 0 0 0-6 0v1zm-3 2v11h12V9h-1v2h-2V9H9v2H7V9H6z",
  business: "M3 21V3h12v6h6v12H3zm2-2h3v-3h2v3h3V5H5v14zm10 0h4v-8h-4v8zM7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z",
  newspaper: "M3 4h15v3h3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4zm2 2v12h11V6H5zm13 3v9h1V9h-1zM7 8h7v4H7V8zm0 6h7v2H7v-2z",
  brush: "M7 16c-2 0-4 2-4 4 2-1 3 1 5 0 2-1 3-2 3-4H7zm14-11-2-2L9 13l2 2L21 5z",
  search_check: "M10 3a7 7 0 1 0 4 13l5 5 2-2-5-5a7 7 0 0 0-6-11zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-1 7-3-2 1-2 2 2 3-3 2 1-5 4z",
  support_agent: "M12 3a8 8 0 0 0-8 8v6a3 3 0 0 0 3 3h3v-6H6v-3a6 6 0 0 1 12 0v3h-4v6h4a2 2 0 0 0 2-2v-7a8 8 0 0 0-8-8z",
  check_circle: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 15-5-5 2-1 3 3 7-7 2 1-9 9z",
};

export default function Icon({ name, className = "size-6" }: { name: string; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor"><path d={paths[name] ?? paths.terminal} /></svg>;
}
