
function groupBy(list, attr) {
    //console.log('group by', list, attr)
    return list.reduce((acc, item) => {
        //console.log("checking", item, 'for', attr, item[attr])
        let val = item[attr]
        if (acc[val]) { acc[val] += 1 } else { acc[val] = 1 }
        //console.log('group by acc', acc)
        return acc
    }, {})
}

module.exports = class FunnelFilter {
    constructor(data, attributes_to_ignore) {
        this.dataset_size = data.length

        //Identify attributes
        this.attributes = data.map(d => Object.keys(d).filter(k => !attributes_to_ignore.includes(k)))
            .reduce((acc, val) => acc.concat(val.filter(x => acc.findIndex(y => x == y) == -1)), [])

        // Group data by attribute and calculate distribution
        this.distribution = this.attributes.map(attr => {
            let values = groupBy(data, attr)
            let size = Object.entries(values).length
            return { "attribute": attr, "values": values, "size": size, "distribution": (this.dataset_size / size) / this.dataset_size * 100 }
        })
        //console.log("distribution", distribution)
    }

    // Remove any attributes that add no value
    // TODO rank the filters so that the best one is the first one
    get filters() {
        return this.distribution
            .filter(attr => Object.entries(attr.values).length > 1)
            .filter(attr => Object.entries(attr.values).length < 6)
    }

}