import { MultipleCheckboxFilter } from "./filters/MultipleCheckboxFilter";
import { BooleanCheckboxFilter } from "./filters/BooleanCheckboxFilter";
import { AreaFilter } from "./filters/AreaFilter/AreaFilter";


export const FiltersBlock = ({
        data,
        multipleCheckboxFiltersCollector,
        booleanCheckboxFiltersCollector,
        areaFilterCollector,
        multipleCheckboxFilterList,
        booleanCheckboxFilterList,
    }) => {
    return (
        <div className="filters-collector">
            <AreaFilter
                data={data}
                onChange={e => areaFilterCollector(e)}
            />
            <MultipleCheckboxFilter
                data={data}
                multipleCheckboxFilterList={multipleCheckboxFilterList}
                onChange={e => multipleCheckboxFiltersCollector(e)}
            />
            <BooleanCheckboxFilter
                data={data}
                booleanCheckboxFilterList={booleanCheckboxFilterList}
                onChange={e => booleanCheckboxFiltersCollector(e)}
            />
        </div>
    )
}


