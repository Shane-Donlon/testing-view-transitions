import { $, component$, useOnDocument } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    const list = [{ id: 1, name: "test1" }, { id: 2, name: "test2" }, { id: 3, name: "test3" }]
    useOnDocument('qviewTransition', $(async (event: CustomEvent<ViewTransition>) => {
        // Get visible item's viewTransitionName (should happen before transition is ready)

        const items = document.querySelectorAll('.item');
        console.log(items)
        // const names = Array.from(items)
        //     .filter((item) => item.checkVisibility())
        //     .map((item) => item.style.viewTransitionName);
        const names = Array.from(items)
            .filter((item) => item.checkVisibility())
            .map((item) => {
                console.log(item.style.viewTransitionName, 'item.style.viewTransitionName')
                return item.style.viewTransitionName
            });
        console.log(names, 'names')
        // Wait for ::view-transition pseudo-class to exist
        const transition = event.detail;
        await transition.ready;

        for (let i = 0; i < names.length; i++) {
            // Note: we animate the <html> element
            console.log('animating', names[i])
            document.documentElement.animate({
                opacity: 0
            }, {
                // Target the pseudo-class inside the <html> element
                pseudoElement: `::view-transition-old(${names[i]})`,
                duration: 300000,
                fill: "forwards",
                delay: i * 10000, // Add delay for each pseudo-class
            })
        }
        await transition.finished;
        console.log('transition finished')
    }))
    return (<>
        <ul>
            {list.map((item) => (
                // Create a name per item
                <li key={item.id} class="item" style={{ viewTransitionName: `_${item.id}_` }}>{item.id ? item.id && item.name : "note"}</li>
            ))}
        </ul>
    </>)
})

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
