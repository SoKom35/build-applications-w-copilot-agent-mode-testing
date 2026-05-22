import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({ message: 'Get all users', endpoint: '/api/users/' });
});
router.post('/', (req, res) => {
    res.json({ message: 'Create a new user', endpoint: '/api/users/' });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get user ${id}`, endpoint: `/api/users/${id}` });
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update user ${id}`, endpoint: `/api/users/${id}` });
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete user ${id}`, endpoint: `/api/users/${id}` });
});
export default router;
//# sourceMappingURL=users.js.map