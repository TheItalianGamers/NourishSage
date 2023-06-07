function getValue(props: any, key: string, drop: number, tot: number) {
  let sum: number = 0;

  props.alims.forEach((alim: any) => {
    if (alim[key] !== "nd" || alim[key] !== "tr.") {
      if (alim[key].toString().includes("<")) {
        let temp: number = Number(alim[key].replace("<", ""));
        sum +=
          (temp / 100) *
          (alim.Nome in props.dropUnitList
            ? parseFloat(props.dropUnitList[alim.Nome])
            : 0.0);
      } else {
        sum +=
          (alim[key] / 100) *
          (alim.Nome in props.dropUnitList
            ? parseFloat(props.dropUnitList[alim.Nome])
            : 0.0);
      }
    }
  });

  const result = (sum / tot) * drop;

  if (isNaN(result)) return 0;

  return result.toFixed(1);
}

function getTotalWeight(props: any) {
  let total_weight: number = 0.0;

  props.alims.forEach((el: any) => {
    let temp: number = 0.0;

    if (el.Nome in props.dropUnitList) {
      if (el["Unità di riferimento"].endsWith("ml")) {
        temp =
          parseFloat(props.dropUnitList[el.Nome]) * parseFloat(el["Densità"]);
      } else {
        temp = parseFloat(props.dropUnitList[el.Nome]);
      }
    }

    total_weight += temp;
  });

  return Math.round(total_weight);
}

function selectionSort(obj: any): Array<string> {
  let arr = Object.keys(obj);
  for (let i = 0; i < arr.length - 1; i++) {
    let min_index = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (Number(obj[arr[j]]) > Number(obj[arr[min_index]])) min_index = j;
    }

    let temp = arr[i];
    arr[i] = arr[min_index];
    arr[min_index] = temp;
  }

  return arr;
}

function search(props: any, key: string): number {
  for (let i = 0; i < props.alims.length; i++) {
    if (props.alims[i].Nome == key) return i;
  }

  return -1;
}

export { getValue, getTotalWeight, selectionSort, search };
