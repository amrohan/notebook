<script lang="ts">
	import { db } from '$lib/db';
	import { goto } from '$app/navigation';

	let book = {
		title: '',
		color: '',
		pages: 50
	};

	async function addBook() {
		const title = (document.getElementById('title') as HTMLInputElement).value;
		const color = (document.getElementById('color') as HTMLSelectElement).value;
		if (!title || !color) return;
		const pages = (document.querySelector('input[name="pages"]:checked') as HTMLInputElement).value;
		if (!pages) return;

		console.log(title, color, pages);

		const id = await db.books.add({
			title,
			color,
			archieved: false,
			createdAt: new Date().getTime()
		});

		if (!id) return;
		for (let i = 0; i < +pages; i++) {
			await db.pages.add({
				title: `Page ${i + 1}`,
				content: '',
				createdAt: new Date().getTime(),
				bookId: id
			});
		}
		alert('Book added');
		// navigate user to the book page in svelte kit
		goto(`/bookpage/${id}`);
	}
</script>

<div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm">
	<div class="p-6">
		<div class="grid gap-4">
			<label
				class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm"
				for="title"
			>
				Title
			</label><input
				bind:value={book.title}
				class="flex h-10 w-full rounded-md border border-zinc-400 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				id="title"
				placeholder="Enter the title"
			/>
			<div>
				<label
					class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm"
					for="color"
				>
					Color
				</label>
				<select
					class="flex h-10 w-full rounded-md border border-zinc-400 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					id="color"
					bind:value={book.color}
				>
					<option value="#FF0000">Red</option>
					<option value="#00FF00">Green</option>
					<option value="#0000FF">Blue</option>
					<option value="#FFFF00">Yellow</option>
					<option value="#FF00FF">Magenta</option>
					<option value="#00FFFF">Cyan</option>
					<option value="#FFA500">Orange</option>
					<option value="#800080">Purple</option>
					<option value="#008000">Dark Green</option>
					<option value="#800000">Maroon</option>
					<option value="#808000">Olive</option>
					<option value="#008080">Teal</option>
					<option value="#000080">Navy</option>
					<option value="#808080">Gray</option>
					<option value="#C0C0C0">Silver</option>
					<option value="#FFD700">Gold</option>
					<option value="#FF4500">Orange Red</option>
					<option value="#FF6347">Tomato</option>
					<option value="#FF8C00">Dark Orange</option>
				</select>
			</div>
			<label
				class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm"
				for="pages"
			>
				Pages
			</label>
			<div class="flex gap-2 mt-2">
				<label for="pages-50">
					<input type="radio" id="pages-50" name="pages" value="50" class="mr-1" />
					50
				</label>
				<label for="pages-100">
					<input type="radio" id="pages-100" name="pages" value="100" class="mr-1" />
					100
				</label>
				<label for="pages-150">
					<input type="radio" id="pages-150" name="pages" value="150" class="mr-1" />
					150
				</label>
				<label for="pages-250">
					<input type="radio" id="pages-250" name="pages" value="250" class="mr-1" />
					250
				</label>
			</div>
		</div>
	</div>
	<div class="flex items-center p-6">
		<button
			on:click={addBook}
			class="inline-flex bg-zinc-900 text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
		>
			Add
		</button>
	</div>
</div>
