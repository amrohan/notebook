<script>
	import { db } from '$lib/db';

	async function getBook() {
		return await db.books.toArray();
	}
</script>

{#await getBook()}
	<p>...loading</p>
{:then books}
	<div class="container relative">
		<main class="mt-1 grid grid-cols-2 gap-4 h-full w-full">
			{#each books as book}
				<a
					href="bookpage/{book.id}"
					class="flex flex-col items-center gap-1 justify-center h-36 rounded-md p-4"
					style:color={book.color}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="200"
						height="200"
						viewBox="0 0 16 16"
						class="fill-current size-28"
						class:book.color={book.color}
					>
						<path
							fill="currentColor"
							d="M14 2v13H3.5a1.5 1.5 0 1 1 0-3H13V0H3C1.9 0 1 .9 1 2v12c0 1.1.9 2 2 2h12V2h-1z"
						/>
						<path fill="currentColor" d="M3.501 13H3.5a.5.5 0 0 0 0 1h9.499v-1H3.501z" />
					</svg>
					<p class="font-bold text-black">{book.title}</p>
				</a>
			{/each}
		</main>
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
