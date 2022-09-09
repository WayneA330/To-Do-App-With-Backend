const CheckUserAccessComponent = ({ access, valueToCompare }) => {
	if (access.length === 0)
		return {
			CanAdd: false,
			CanDeactivate: false,
			CanDownload: false,
			CanEdit: false,
			CanUpload: false,
			CanView: false,
		}

	//getComponent of the value to search
	const getComponent = access
		.map(a => a.components)
		.flat()
		.filter(c => c.ComponentName === valueToCompare)
		.reduce((acc, val) => {
			const {
				ComponentName,
				CanDeactivate,
				CanDownload,
				CanAdd,
				CanEdit,
				CanUpload,
				CanView,
			} = val

			return {
				ComponentName,
				CanDeactivate: acc.CanDeactivate ? acc.CanDeactivate : CanDeactivate,
				CanDownload: acc.CanDownload ? acc.CanDownload : CanDownload,
				CanAdd: acc.CanAdd ? acc.CanAdd : CanAdd,
				CanEdit: acc.CanEdit ? acc.CanEdit : CanEdit,
				CanUpload: acc.CanUpload ? acc.CanUpload : CanUpload,
				CanView: acc.CanView ? acc.CanView : CanView,
			}
		}, {})

	//if max is null return all false
	return Object.keys(getComponent).length !== 0
		? getComponent
		: {
				CanAdd: false,
				CanDeactivate: false,
				CanDownload: false,
				CanEdit: false,
				CanUpload: false,
				CanView: false,
		  }
}

export { CheckUserAccessComponent }
