import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({ message: 'Get all activities', endpoint: '/api/activities/' });
});
router.post('/', (req, res) => {
    res.json({ message: 'Log a new activity', endpoint: '/api/activities/' });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get activity ${id}`, endpoint: `/api/activities/${id}` });
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update activity ${id}`, endpoint: `/api/activities/${id}` });
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete activity ${id}`, endpoint: `/api/activities/${id}` });
});
export default router;
//# sourceMappingURL=activities.js.map