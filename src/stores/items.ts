import { defineStore } from 'pinia';
import { type Item } from '../models/item';

const apiEndpoint = 'http://localhost:3000/things';

const useItemStore = defineStore('itemStore', {
    state: () => ({
        items: [] as Item[],
        searchQuery: '',
        selectedType: 'Book',
        types: ["Book", "Coin", "Stamp", "Toy"],
        selectedItem: null
    }),

    getters: {
        filteredItems: (state) => {
            const query = state.searchQuery.toLowerCase();
            let type = state.selectedType.toLowerCase();
            return state.items.filter((item: Item) => {
                return (
                    (item.title.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query)) &&
                    item.type.toLowerCase().match(type)
                );
            });
        },
    },
    actions: {

        async fetchItems() {
            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania elementów');
                }
                this.items = await response.json();
            } catch (error) {
                console.error('fetchItems error:', error);
            }
        },

        async addItem(newItem: Item) {
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                if (!response.ok) {
                    throw new Error('Błąd podczas dodawania elementu');
                }
                this.items.push(newItem);
            } catch (error) {
                console.error('addItem error:', error);
            }
        },

        async deleteItem(itemId: string) {
            try {
                const response = await fetch(`${apiEndpoint}/${itemId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Błąd podczas usuwania elementu');
                }
                this.items = this.items.filter(item => item.id !== itemId);
                this.closeItemDetails()
            } catch (error) {
                console.error('deleteItem error:', error);
            }
        },

        showItemDetails(item: null) {
            this.selectedItem = item;
        },

        closeItemDetails() {
            this.selectedItem = null;
        },
        updateType(newType: string) {
            this.selectedType = newType;
        }

    }
});
export default useItemStore
