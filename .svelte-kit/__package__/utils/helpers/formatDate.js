export default (value, isLong = true) => {
    if (!value)
        return null;
    return `${value.day}/${value.month}/${value.year} ${isLong ? ` , ${value.hour}h:${value.minute}m` : ''}`;
};
