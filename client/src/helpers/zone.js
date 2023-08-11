export default class Zone {
  constructor(scene) {
    this.renderZone = () => {
        let dropZone = scene.add.zone(300, 225, 500, 150).setRectangleDropZone(450, 275);
        dropZone.setData({ cards: 0 });
        return dropZone;
    };
    this.renderOutline = (dropZone) => {
        let dropZoneOutline = scene.add.graphics();
        dropZoneOutline.lineStyle(2, 0xf5f5dc);
        dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
    }
  }
}