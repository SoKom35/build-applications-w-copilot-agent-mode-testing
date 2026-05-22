import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({ message: 'Get all workout suggestions', endpoint: '/api/workouts/' });
});
router.post('/', (req, res) => {
    res.json({ message: 'Create personalized workout suggestion', endpoint: '/api/workouts/' });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get workout ${id}`, endpoint: `/api/workouts/${id}` });
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update workout ${id}`, endpoint: `/api/workouts/${id}` });
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete workout ${id}`, endpoint: `/api/workouts/${id}` });
});
export default router;
//# sourceMappingURL=workouts.js.map