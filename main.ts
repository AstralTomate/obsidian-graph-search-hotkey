import { App, Plugin, View} from 'obsidian';


export default class EasyGraphSearch extends Plugin {
	async onload() {

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'simple-graph-search',
			name: 'Simply jump to the search bar in Graph view',
			hotkeys: [{ modifiers: ["Alt"], key: "f" }],
			checkCallback: (checking: boolean) => {
				// Conditions to check				
				const graphView = this.app.workspace.getActiveViewOfType(View);
				console.log(graphView);
				// Check if null
				if (graphView) {
					// Check if the active view is a graph
					if (graphView.getViewType() == "graph") {	
						// make sure that the graph controls is visable
						graphView.dataEngine.controlsEl.getElementsByClassName("clickable-icon graph-controls-button mod-open")[0].click()
						// make sure that the filter options are not collapsed
						graphView.dataEngine.filterOptions.setCollapsed(false)
						// define the searchbox element
						const searchBox = graphView.dataEngine.filterOptions.search.inputEl;
						// select the input field TODO: copy search to clipboard? or add to settings
						searchBox.select(true)
						// Put the cursor in the end of the input field
						searchBox.setSelectionRange(searchBox.selectionEnd, searchBox.selectionEnd)
					}
				}
				
			}
		});

	}

	onunload() {

	}

}


