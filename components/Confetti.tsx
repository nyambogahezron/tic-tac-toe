import React, { useEffect, useState, memo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
	withSequence,
	withRepeat,
	Easing,
	cancelAnimation,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const NUM_CONFETTI = 50;
const COLORS = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

interface ConfettiPieceProps {
	index: number;
	onComplete: () => void;
}

const ConfettiPiece = memo(({ index, onComplete }: ConfettiPieceProps) => {
	const randomValues = React.useMemo(() => {
		return {
			startX: Math.random() * width,
			startY: -50 - Math.random() * 100,
			endY: height + 100,
			rotation: Math.random() * 360,
			size: 6 + Math.random() * 8,
			color: COLORS[Math.floor(Math.random() * COLORS.length)],
			duration: 2000 + Math.random() * 2000,
			delay: Math.random() * 500,
			rotateDuration: 1000 + Math.random() * 1000,
		};
	}, []);

	const translateY = useSharedValue(randomValues.startY);
	const rotate = useSharedValue(0);
	const translateX = useSharedValue(randomValues.startX);

	useEffect(() => {
		translateY.value = withDelay(
			randomValues.delay,
			withTiming(
				randomValues.endY,
				{ duration: randomValues.duration, easing: Easing.linear },
				(finished) => {
					if (finished) {
						// onComplete(); // Optional: cleanup logic
					}
				}
			)
		);

		rotate.value = withDelay(
			randomValues.delay,
			withRepeat(
				withTiming(360, { duration: randomValues.rotateDuration }),
				-1
			)
		);

		// Sway effect
		translateX.value = withDelay(
			randomValues.delay,
			withRepeat(
				withSequence(
					withTiming(randomValues.startX + 30, {
						duration: 1000,
						easing: Easing.sin,
					}),
					withTiming(randomValues.startX - 30, {
						duration: 1000,
						easing: Easing.sin,
					})
				),
				-1,
				true
			)
		);

		return () => {
			cancelAnimation(translateY);
			cancelAnimation(rotate);
			cancelAnimation(translateX);
		};
	}, [randomValues, onComplete, translateY, rotate, translateX]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ rotate: `${rotate.value}deg` },
			{ rotateX: `${rotate.value}deg` },
		],
	}));

	return (
		<Animated.View
			style={[
				styles.piece,
				animatedStyle,
				{
					backgroundColor: randomValues.color,
					width: randomValues.size,
					height: randomValues.size,
					borderRadius: Math.random() > 0.5 ? randomValues.size / 2 : 0,
				},
			]}
		/>
	);
});

ConfettiPiece.displayName = 'ConfettiPiece';

const Confetti = memo(() => {
	const [pieces, setPieces] = useState<number[]>([]);

	useEffect(() => {
		// Initialize pieces
		setPieces(Array.from({ length: NUM_CONFETTI }, (_, i) => i));
	}, []);

	return (
		<View style={styles.container} pointerEvents="none">
			{pieces.map((i) => (
				<ConfettiPiece key={i} index={i} onComplete={() => {}} />
			))}
		</View>
	);
});

Confetti.displayName = 'Confetti';

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		overflow: 'hidden',
		zIndex: 999,
		elevation: 999,
	},
	piece: {
		position: 'absolute',
	},
});

export default Confetti;
