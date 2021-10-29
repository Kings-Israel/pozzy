let loader;

const showLoader = (parentComponent, containerRef=null, height=80, width=80) => {
    loader = parentComponent.$loading.show({
        container: containerRef,
        color: "#0086FF",
        height: height,
        width: width,
        backgroundColor: '#000',
        opacity: 0.2,
        loader: "bars",
    });
}

const hideLoader = (timeout) => {
    setTimeout(() => {
        loader.hide()
    },timeout) 
}

export {showLoader, hideLoader}
