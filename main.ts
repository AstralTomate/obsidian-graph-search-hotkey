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
					this.app.workspace.activeLeaf.view.dataEngine.controlsEl.getElementsByClassName("clickable-icon graph-controls-button mod-open")[0].click()
					this.app.workspace.activeLeaf.view.dataEngine.filterOptions.setCollapsed(false)
					this.app.workspace.activeLeaf.view.dataEngine.filterOptions.search.inputEl.select(true)
					// Not elegant, but who cares ...
					
					this.app.workspace.activeLeaf.view.dataEngine.filterOptions.search.inputEl.setSelectionRange(this.app.workspace.activeLeaf.view.dataEngine.filterOptions.search.inputEl.selectionEnd,this.app.workspace.activeLeaf.view.dataEngine.filterOptions.search.inputEl.selectionEnd)
				}
			}
		});

	}

	onunload() {

	}

}


