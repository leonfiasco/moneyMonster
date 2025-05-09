import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Svg, { G, Circle, Text as SVGText } from "react-native-svg";

const colors = {
  Food: "#FF5252",
  Transport: "#FF4081",
  Shopping: "#E040FB",
  Entertainment: "#7C4DFF",
  Other: "#536DFE",
  Salary: "#4CAF50",
  Freelance: "#2196F3",
};

// Decreased radius by ~20px equivalent (from 70 to 60)
const radius = 60;
const strokeWidth = 30;
const center = radius + strokeWidth;
const circumference = 2 * Math.PI * radius;

type Props = {
  transactions: Array<{
    type: string;
    amount: number;
    category: string;
  }>;
};

const CategoryDoughnut = ({ transactions }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const animatedValues = useRef<Animated.Value[]>([]).current;

  // Calculate total expenses
  const total = transactions.reduce((sum, t) => {
    return t.type === "expense" ? sum + t.amount : sum;
  }, 0);

  // Group by category
  const categoryData = transactions.reduce((acc, t) => {
    if (t.type !== "expense") return acc;

    if (!acc[t.category]) {
      acc[t.category] = {
        amount: 0,
        color: colors[t.category as keyof typeof colors] || "#999",
      };
    }
    acc[t.category].amount += t.amount;
    return acc;
  }, {} as Record<string, { amount: number; color: string }>);

  // Convert to array and calculate percentages
  const chartData = Object.entries(categoryData).map(([category, data]) => ({
    category,
    amount: data.amount,
    color: data.color,
    percentage: total > 0 ? data.amount / total : 0,
  }));

  // Initialize animations
  useEffect(() => {
    chartData.forEach((_, index) => {
      if (!animatedValues[index]) {
        animatedValues[index] = new Animated.Value(0);
      }

      Animated.spring(animatedValues[index], {
        toValue: chartData[index].percentage,
        friction: 5,
        tension: 40,
        useNativeDriver: false,
      }).start();
    });
  }, [transactions]);

  // Calculate angles for proper segment placement
  let startAngle = 0;
  const totalPercentage = chartData.reduce(
    (sum, slice) => sum + slice.percentage,
    0
  );

  return (
    <View style={styles.container}>
      <Svg
        width={center * 2 - 20} // Decreased width by 20px
        height={center * 2 - 20} // Decreased height by 20px
        viewBox={`0 0 ${center * 2} ${center * 2}`}
      >
        {/* Background circle for empty space */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        <G rotation="-90" origin={`${center}, ${center}`}>
          {chartData.map((slice, index) => {
            const angle = slice.percentage * 360;
            const strokeDasharray = [
              (circumference * angle) / 360,
              circumference * (1 - slice.percentage),
            ].join(",");

            const segment = (
              <Circle
                key={slice.category}
                cx={center}
                cy={center}
                r={radius}
                stroke={slice.color}
                strokeWidth={
                  selectedCategory === slice.category
                    ? strokeWidth + 5
                    : strokeWidth
                }
                strokeDasharray={strokeDasharray}
                strokeDashoffset={0}
                strokeLinecap="round"
                fill="transparent"
                origin={`${center}, ${center}`}
                rotation={startAngle}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === slice.category ? null : slice.category
                  )
                }
              />
            );

            startAngle += angle;
            return segment;
          })}
        </G>

        {/* Center text */}
        <SVGText
          x={center}
          y={center}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={12}
          fontWeight="bold"
          fill="#333"
        >
          {selectedCategory
            ? `${selectedCategory} ${(
                chartData.find((d) => d.category === selectedCategory)
                  ?.percentage || 0 * 100
              ).toFixed(1)}%`
            : `$${total.toFixed(2)}`}
        </SVGText>
      </Svg>

      {/* Category labels - changed to pill shape */}
      <View style={styles.labelsContainer}>
        {chartData.map((slice) => (
          <TouchableOpacity
            key={slice.category}
            style={[
              styles.pillItem, // Changed from labelItem to pillItem
              {
                backgroundColor: slice.color,
                opacity: selectedCategory === slice.category ? 1 : 0.7,
              },
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === slice.category ? null : slice.category
              )
            }
          >
            <Text style={styles.pillText}>{slice.category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 12, // Increased padding for larger container
    // marginVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 16,

    alignSelf: "center",
  },
  labelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    width: "100%", // Take full width of container
  },
  pillItem: {
    // New pill style
    paddingHorizontal: 9,
    paddingVertical: 3,
    margin: 4,
    borderRadius: 30, // Pill shape (higher value than height)
    minWidth: 60, // Minimum width for pill shape
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default CategoryDoughnut;
