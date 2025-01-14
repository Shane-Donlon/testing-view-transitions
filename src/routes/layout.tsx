import { $, Slot, component$, useOnDocument } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Header } from "~/components/header";
import { NavLink } from "~/components/navlink";

import { useTheme } from 'qwik-themes-testing-donlos-version-1';



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
  const {  setTheme } = useTheme()
  useOnDocument('qviewTransition', $(async (event: CustomEvent<ViewTransition>) => {

    const transition = event.detail;
    await transition.ready;


    document.documentElement.animate([{ opacity: 0, }], { duration: 750, easing: 'ease-in-out' })
    await transition.finished;
    const p = document.querySelector('p')
    if (p) {
      p.innerText = "Transitioned"
    }
  }))



  return (<>
    <Header>
      <NavLink href="/">Home</NavLink>
      <button type="button" onClick$={() => setTheme('light')}>Light Mode</button>
      <button type="button" onClick$={() => {
        document.startViewTransition(() => { setTheme('dark') })
      }}>Dark Mode</button>
      <NavLink href="/about/">About</NavLink>
      <NavLink href="/test/">Test</NavLink>
    </Header>
    <Slot />
  </>)
});
