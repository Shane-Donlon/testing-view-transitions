import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import { Header } from "~/components/header";
import { NavLink } from "~/components/navlink";
export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return <><Header>
    <NavLink href="/">Home</NavLink>
    <button type="button" onClick$={() =>
      // setTheme('light')
      console.log("light")}>Light Mode</button>
    <button type="button" onClick$={() => {
      // setTheme('dark')
      console.log("dark")
    }}>Dark Mode</button>
    <NavLink href="/about/">About</NavLink>
    <NavLink href="/test/">Test</NavLink>
  </Header >
    <Slot /></>
});


// return (<>

// </>)
// });
