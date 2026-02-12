import React, { useRef, useEffect, memo, useCallback, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import GameCell from './GameCell'
import { useGame } from '../context/GameProvider';
import { useTheme } from '@/context/ThemeProvider';
import { useAudio } from '@/context/AudioProvider'
import Confetti from './Confetti'

const { width } = Dimensions.get('window')
const boardSize = Math.min(width - 60, 280)
const cellSize = boardSize / 3

const GameBoard = memo(function GameBoard() {
	const { state, dispatch } = useGame()
	const { colors } = useTheme()
	const { playSound, triggerHaptic } = useAudio()
	const timeoutRef = useRef<number | null>(null)
	const prevBoardRef = useRef<any[]>(state.board)
	const prevWinnerRef = useRef(state.winner)

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	// Handle Win/Draw Sounds
	useEffect(() => {
		if (state.winner && state.winner !== prevWinnerRef.current) {
			if (state.winner === 'draw') {
				playSound('draw')
			} else {
				// Play win sound for any winner (Player or AI) - it marks the end of game
				playSound('win')
				triggerHaptic('success')
			}
		}
		prevWinnerRef.current = state.winner
	}, [state.winner, playSound, triggerHaptic])

	// Handle AI Move Sounds
	useEffect(() => {
		// Only check if it's AI mode
		if (state.gameMode === 'vsAI') {
			// Check if a new 'O' piece appeared (AI is always O)
			const hasNewOPiece = state.board.some(
				(cell, index) => cell === 'O' && prevBoardRef.current[index] === null
			)

			// Also handle movement phase in Level 2/3: piece moved from one spot to another
			// We can just check if any cell became 'O' that wasn't 'O' before
			// But wait, if we moved a piece, one cell became null and another became 'O'.
			// So "some cell is O now but was not O before" is a good check.

			if (hasNewOPiece) {
				playSound('move')
			}
		}
		prevBoardRef.current = state.board
	}, [state.board, state.gameMode, playSound])

	// Helper function to determine which borders a cell should have
	const getCellBorders = useCallback(
		(index: number) => {
			const row = Math.floor(index / 3)
			const col = index % 3

			return {
				borderRightWidth: col < 2 ? 2 : 0, // Right border for first two columns
				borderBottomWidth: row < 2 ? 2 : 0, // Bottom border for first two rows
				borderColor: colors.border,
			}
		},
		[colors.border]
	)

	const boardStyle = useMemo(
		() => [
			styles.board,
			{
				width: boardSize,
				height: boardSize,
			},
		],
		[]
	)

	const isDisabled = useMemo(
		() =>
			!state.isGameActive ||
			(state.gameMode === 'vsAI' && state.currentPlayer === 'O'),
		[state.isGameActive, state.gameMode, state.currentPlayer]
	)

	return (
		<View style={styles.container}>
			<Animated.View
				entering={FadeInUp.delay(200).springify()}
				style={boardStyle}
			>
				{state.board.map((cell, index) => (
					<GameCell
						key={index}
						index={index}
						value={cell}
						size={cellSize}
						cellBorders={getCellBorders(index)}
						disabled={isDisabled}
					/>
				))}

				{/* Winning Line Animation Removed as per request */}
				{state.winner && state.winner !== 'draw' && (
					<>
						{/* Show Confetti if Player (X) wins or even if AI wins (visual flair) */}
						<Confetti />
					</>
				)}
			</Animated.View>
		</View>
	)
})

export default GameBoard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	board: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
