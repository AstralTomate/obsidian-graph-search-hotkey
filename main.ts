import { App, Plugin} from 'obsidian';


export default class EasyGraphSearch extends Plugin {
	async onload() {

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'simple-graph-search',
			name: 'Simply jump to the search bar in Graph view',
			hotkeys: [{ modifiers: ["Alt"], key: "f" }],
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const graphView = this.app.workspace.getLeaf().getViewState().type;	
								
				if (graphView == "graph") {	
					// make sure that the graph controls is visable
					this.app.workspace.activeLeaf.view.dataEngine.controlsEl.getElementsByClassName("clickable-icon graph-controls-button mod-open")[0].click()
					// make sure that the filter options are not collapsed
					this.app.workspace.activeLeaf.view.dataEngine.filterOptions.setCollapsed(false)
					// select the input field
					this.app.workspace.activeLeaf.view.dataEngine.filterOptions.search.inputEl.select(true)
					// Put the cursor in the end of the input field
					this.app.workspace.activeLeaf.view.dataEngine.filterOptions.search.inputEl.setSelectionRange(this.app.workspace.activeLeaf.view.dataEngine.filterOptions.search.inputEl.selectionEnd,this.app.workspace.activeLeaf.view.dataEngine.filterOptions.search.inputEl.selectionEnd)
				}
			}
		});

	}

	onunload() {

	}

}


