import Dexie from 'dexie';

// Define the Book and Page types
export interface Book {
	id?: number;
	title: string;
	color: string;
	archieved?: boolean;
	createdAt: number;
}

export interface Page {
	id?: number;
	title: string;
	content: string;
	createdAt: number;
	bookId: number; // Foreign key referencing the Book's id
}

export class AppDB extends Dexie {
	books!: Dexie.Table<Book, number>;
	pages!: Dexie.Table<Page, number>;

	constructor() {
		super('ngdexieliveQuery');
		// Increase the version number to apply the schema changes
		this.version(2).stores({
			// Changed from 1 to 2
			books: '++id, title, color, archieved, createdAt',
			pages: '++id, title, content, createdAt, bookId'
		});

		// this.on('ready', async () => {
		// 	const bookCount = await this.books.count();
		// 	if (bookCount === 0) {
		// 		console.log('Database is empty. Populating with mock data...');
		// 		const books = [
		// 			{ title: 'Book 1', color: 'Red', createdAt: Date.now() },
		// 			{ title: 'Book 2', color: 'Blue', createdAt: Date.now() }
		// 			// Add more books as needed
		// 		];
		// 		const pages = [
		// 			{
		// 				title: 'Page 1',
		// 				content: 'Content 1',
		// 				createdAt: Date.now(),
		// 				bookId: 1
		// 			},
		// 			{
		// 				title: 'Page 2',
		// 				content: 'Content 2',
		// 				createdAt: Date.now(),
		// 				bookId: 1
		// 			}
		// 			// Add more pages as needed
		// 		];
		// 		await this.books.bulkAdd(books);
		// 		await this.pages.bulkAdd(pages);
		// 		console.log('Done populating.');
		// 	} else {
		// 		console.log('Already populated');
		// 	}
		// });
	}

	// Additional methods can be added here
}

export const db = new AppDB();
